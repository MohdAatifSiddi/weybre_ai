import MainSection from "./_common/main-section";
import { generateUUID } from "@/lib/utils";

export default async function Home() {
    const id = generateUUID();

    return <MainSection key={id} id={id} />;
}