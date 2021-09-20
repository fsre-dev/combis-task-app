
export async function createContact(contact: any) {
    const req = fetch("/api/contact/create", {
            method: "POST",
            cache: "no-cache",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
             },
            body: JSON.stringify(contact),
        })

    const resp = await req;
    const content = await resp.json()

    return { content: content, status: resp.status }

}