import React from "react";
import Lottie from "react-lottie"
import notFoundAnimation from "./NotFoundAnimation.json"

export default function NotFoundPage() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFoundAnimation, // The animation data imported from the JSON file
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    // Render the Lottie animation using the default options
    return (
        <div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-pink-800 dark:text-gray-200 mb-8 text-center">Page Not Found</h1>
            <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false} />
        </div>
    );
}