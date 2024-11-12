import Image from "next/image";
import ClientComponent from "@/components/ClientComponent";
import LoginButton from "@/components/LoginButton"; // Import LoginButton here

export default function Home() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-green-50">
            {/* Login Button positioned at the top-right */}
            <div className="absolute top-4 right-4">
                <LoginButton />
            </div>

            {/* Background Image */}
            <div className="relative w-[50vw] h-[50vh]">
                <Image
                    src="/images/background.webp"
                    alt="Background floral shop"
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                    className="rounded-lg shadow-lg"
                    priority
                />
            </div>

            {/* Overlay Content */}
            <ClientComponent />
        </div>
    );
}
