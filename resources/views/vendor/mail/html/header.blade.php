@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
{{-- <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo"> --}}
<img src="https://eng-card.com/images_materials/light-logo.png" alt="" width="120px">
@else
{{-- {{ $slot }} --}}
<img src="https://eng-card.com/images_materials/light-logo.png" alt="" width="120px">
@endif
</a>
</td>
</tr>
