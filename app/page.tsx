import Image from "next/image";
import ClientComponent from "@/components/ClientComponent";
import LoginButton from "@/components/LoginButton";

export default function Home() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-green-50">
            {/* Login Button positioned at the top-right */}
            <div className="absolute top-4 right-4 z-10">
                <LoginButton />
            </div>

            {/* Background Image */}
            <div className="relative w-full h-full min-w-[80vw] min-h-[85vh] md:w-[50vw] md:h-[50vh]  -z-10 ">
                <Image
                    src="/images/background1.PNG"
                    alt="Background floral shop"
                    fill
                    style={{ 
                        objectFit: "cover",
                        objectPosition: "20% center"  // Center the image to the left
                    }}
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
