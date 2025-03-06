
import { useSearchParams } from "@solidjs/router";
import Quill from "quill";
// import {}
import { createSignal, onMount } from "solid-js";
const [getContent, setContent] = createSignal([])
const [email, setEmail] = createSignal([])
const [userId, setUserId]=createSignal()

function Rmore() {

    let quillRef
    const [searchParams] = useSearchParams();
    const inx = searchParams.index

    console.log(inx, "________");

    onMount(() => {

        fetch('http://localhost:3000/getBlog').then((res) => {
            console.log(typeof res);

            return res.json()
        })
            .then((data) => {

                let data2=data.data
                let em=data.email
                console.log(data2);

                console.log(data, "datatata");

                let arrOfEmail = em.map((arr) => arr.email)
                // console.log(arrOfEmail, 'email');

                setEmail(arrOfEmail)
                setUserId(arrOfEmail)
                console.log("fet email",userId());

                console.log(arrOfEmail,"arr of email");


                let arrOfObj = data2.map((arr) => JSON.parse(arr.content)); // Convert all JSON strings to objects
                setContent(arrOfObj);

                // console.log(arrOfObj, "array of object");

                console.log(getContent());
                // console.log("Email", email());



            }).catch(err => {
                console.log(err);
            })




        const quill = new Quill(quillRef, {
            theme: "bubble",
            readOnly: true
        });

        quill.setContents(getContent());  // ✅ Set Quill content properly

    })


    return (
        <div class="p-6 bg-black text-white h-100%">
            <div class='w-4xl bg-blue-500 h-100% p-14 ml-50 rounded-2xl'>

                <h1 class="text-6xl font-bold text-center" >{searchParams.title}</h1>


                <div ref={(el) => (quillRef = el)} class="mt-4 text-xl bg-white p-4 rounded-md text-black"></div> {/* ✅ Use callback ref */}

                <h1>{email()[inx]} </h1>
            </div>


            <Show when={getContent()}>
                {() => {

                    const quill = new Quill(quillRef, {
                        theme: "bubble",
                        readOnly: true
                    });
                    const content = getContent()[inx]

                    console.log("content", content);

                    quill.updateContents(content);

                    quill.insertText(quill.getLength(), "\n\n----------------------\n\n", {});

                }}
            </Show>
        </div>

    );
}

export default Rmore;
