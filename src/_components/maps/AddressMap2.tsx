"use client"

interface MapEmbedProps {
    width?: string | number;
    height?: string | number;
    className?: string;
}

export default function AddressMap2({
    width = 600,
    height = 450,
    className
}: MapEmbedProps) {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.4102668508594!2d31.054436774350627!3d-17.81939237606863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a52024818711%3A0xd589100b0132453f!2s288%20Herbert%20Chitepo%20Ave%2C%20Harare!5e0!3m2!1sen!2szw!4v1790861000724!5m2!1sen!2szw"
            width={width}
            height={height}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className={className}
        />
    );
}