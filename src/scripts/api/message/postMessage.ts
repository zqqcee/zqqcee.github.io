import type { IMessage } from "@/types/message";

export const postMessage = async (data: IMessage) => {
    const url = new URL(`/message/add`, 'http://localhost:3000')
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const resObject = await response.json();
    console.log(resObject)
}

