<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;//登録ユーザーのDBを使用
use Illuminate\Support\Facades\Storage;//ストレージ操作
use App\Http\Requests\UserIdPrecognitionFormRequest;//バリデーション


class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update and Add the profile photo
     */
    public function photo_update(Request $request)
    {
        $me = User::find(Auth::id());

        $request->validate([
            'profile_photo_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

    
        if ($me->profile_photo_path) {
            Storage::disk('public')->delete('images/profile/' . $me->profile_photo_path);
        }
    
        $image = $request->file('profile_photo_path');
        if ($image) {
            $path = $image->store('public/images/profile');
            $me->profile_photo_path = basename($path);
            $me->save();
    
            return Redirect::route('profile.edit');
        }
    
        return Redirect::route('profile.edit');
        //return Inertia::render('Profile/Edit');
    }

    public function update_personal_id(UserIdPrecognitionFormRequest $request): RedirectResponse
    {
        $me = User::find(Auth::id());
        $me->personal_id = $request->personal_id;
        $me->save();
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
