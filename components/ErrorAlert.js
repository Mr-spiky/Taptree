"use client";

import { useState } from "react";

/**
 * Reusable Neo-brutalist error alert component.
 * Maps error codes to personalized, user-friendly messages.
 *
 * @param {string} errorCode - Machine-readable error code from API
 * @param {string} message   - Fallback human-readable message
 * @param {object} context   - Extra context (e.g. { handle: "spiky" })
 * @param {boolean} dismissible - Whether the alert can be dismissed
 * @param {function} onDismiss - Callback when dismissed
 */

const ERROR_MAP = {
    HANDLE_TAKEN: {
        icon: "🚫",
        title: "Handle already taken!",
        color: "bg-brutal-red",
        getDescription: (ctx) =>
            `@${ctx?.handle || "this handle"} is already in use. Try something unique like @${ctx?.handle || "name"}_official or @the_real_${ctx?.handle || "name"}`,
    },
    INVALID_URL: {
        icon: "🔗",
        title: "Invalid URL detected",
        color: "bg-brutal-yellow",
        getDescription: () =>
            "Make sure all your links start with https:// or http://. Example: https://instagram.com/yourname",
    },
    INVALID_IMAGE: {
        icon: "🖼️",
        title: "Invalid image URL",
        color: "bg-brutal-yellow",
        getDescription: () =>
            "Your profile picture URL must be a valid image link (https://...). Try right-clicking an image online and copying the image address.",
    },
    MISSING_FIELD: {
        icon: "📝",
        title: "Missing information",
        color: "bg-brutal-yellow",
        getDescription: (ctx) =>
            ctx?.field ? `Please fill in the "${ctx.field}" field to continue.` : "Please fill in all required fields.",
    },
    INVALID_HANDLE: {
        icon: "⚠️",
        title: "Invalid handle format",
        color: "bg-brutal-yellow",
        getDescription: () =>
            "Handles can only contain letters, numbers, dots, underscores, and hyphens. No spaces or special characters.",
    },
    AUTH_REQUIRED: {
        icon: "🔒",
        title: "Login required",
        color: "bg-brutal-blue",
        getDescription: () =>
            "You need to be signed in to do this. Please log in or create an account first.",
    },
    WRONG_PASSWORD: {
        icon: "🔑",
        title: "Incorrect password",
        color: "bg-brutal-red",
        getDescription: () =>
            "The password you entered doesn't match. Double-check for typos or try resetting your password.",
    },
    NO_ACCOUNT: {
        icon: "👤",
        title: "Account not found",
        color: "bg-brutal-red",
        getDescription: (ctx) =>
            `No account exists for ${ctx?.email || "this email"}. Check for typos or create a new account.`,
    },
    NETWORK_ERROR: {
        icon: "📡",
        title: "Connection problem",
        color: "bg-brutal-red",
        getDescription: () =>
            "Couldn't reach the server. Check your internet connection and try again.",
    },
};

export default function ErrorAlert({
    errorCode,
    message,
    context = {},
    dismissible = true,
    onDismiss,
}) {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const mapped = ERROR_MAP[errorCode];
    const title = mapped?.title || "Something went wrong";
    const icon = mapped?.icon || "❌";
    const description = mapped?.getDescription?.(context) || message || "An unexpected error occurred. Please try again.";
    const stripColor = mapped?.color || "bg-brutal-red";

    const handleDismiss = () => {
        setDismissed(true);
        onDismiss?.();
    };

    return (
        <div
            className="brutal-card-static overflow-hidden animate-fade-in mb-6"
            role="alert"
        >
            <div
                className={`${stripColor} h-1.5`}
                style={{ marginTop: "-1px" }}
            />
            <div className="p-4 flex items-start gap-3">
                <span className="text-lg shrink-0 mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-brutal-black uppercase tracking-wide">
                        {title}
                    </h4>
                    <p className="text-xs text-brutal-gray font-medium mt-1 leading-relaxed">
                        {description}
                    </p>
                </div>
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="shrink-0 w-6 h-6 flex items-center justify-center rounded border-2 border-brutal-border bg-brutal-bg hover:bg-brutal-red hover:text-white transition-colors text-xs font-black"
                        aria-label="Dismiss error"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
