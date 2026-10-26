
import Serching from "@/components/Searching"
import SearchingApi from "@/components/SearchingApi"
import SearchingContextapi from "@/components/SearchingContextapi"
import { SearchProvider } from "@/context/SearchContext";
export default function Practical(){


    return (<>
    <h1>hello</h1>
    <SearchProvider>
    <SearchingContextapi/>
    </SearchProvider>
        </>)
}