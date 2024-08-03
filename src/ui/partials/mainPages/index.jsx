import Header from "@/ui/components/Header"
import { useState } from "react";
import Content from "@/ui/components/Content";
import { getToken, getUser } from "@/data/services/storage";
import { Navbar } from "../../components/Navbar/Navbar";

export default function MainPages() {

    const [isVisible, setIsVisible] = useState(true);
    const isUserLoggedIn = () => !getToken() || !getUser();

    // if (isUserLoggedIn()) {
    //     window.location.href = '/';
    // }

    return (
        <section className="flex relative">
            <Navbar isVisible={isVisible} />
            <main className="flex-1">
                <Header onClick={() => setIsVisible((prev) => !prev)} />
                <Content />
            </main>
        </section>
    )


}