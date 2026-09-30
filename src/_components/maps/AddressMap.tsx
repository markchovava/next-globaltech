"use client"

export default function AddressMap() {
    return (
        <div className="w-full h-full">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.9987854291403!2d31.065438988854986!3d-17.744696399999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931af0003188351%3A0xa5bb160057517185!2sPomona%20Commercial%20Centre!5e0!3m2!1sen!2szw!4v1784975797505!5m2!1sen!2szw"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Pomona Commercial Centre Map"
            />
        </div>
    );
};



