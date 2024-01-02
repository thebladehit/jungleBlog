import {writable} from "svelte/store";

export const articlesData = writable([]);

export async function fetchArticles(){
    const url = "/api/story";
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`HTTP error! ${response.status}`)
    }
    const data = await response.json();
    console.log(data)
    articlesData.set(data);
}
