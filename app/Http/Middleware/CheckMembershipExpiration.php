<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckMembershipExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'member' && $user->is_membership && $user->membership_end_at) {
                if (now()->greaterThanOrEqualTo($user->membership_end_at)) {
                    $user->is_membership = false;
                    $user->membership_start_at = null;
                    $user->membership_end_at = null;
                    $user->save();
                }
            }
        }

        return $next($request);
    }
}
