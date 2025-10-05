import Cta from "@/components/sections/cta/default"
import FAQ from "@/components/sections/faq/default"
import Footer from "@/components/sections/footer/default"
import Hero from "@/components/sections/hero/default"
import Items from "@/components/sections/items/default"
import Media from "@/components/sections/media/default"
import Navbar from "@/components/sections/navbar/default"

export default function Home() {
    return (
        <>
            <Navbar />

            <Hero />

            <Items />

            <Media />

            <FAQ />

            <Cta />

            <Footer />
        </>
    )
}
