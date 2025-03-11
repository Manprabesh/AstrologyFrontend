import { json, useNavigate } from "@solidjs/router";
import { createSignal, For } from 'solid-js';
import Quill from "quill";
import Header from "./header";
import { onMount } from "solid-js";
import 'quill/dist/quill.snow.css';
function Blogs() {
    const navigate = useNavigate();
    const [getBlog2, setBlog2] = createSignal([])
    const [getContent, SetContent] = createSignal([])
    const [getHeading, setHeading] = createSignal([])
    let editorRef
    let containerRef;

    const handleReadMore = (blog, index) => {
        console.log("--------------");

        console.log(index, "index");
        navigate(`/Rmore?title=${encodeURIComponent(blog)}&index=${encodeURIComponent(index)}`);
    };

    onMount(()=>{
        fetch('http://localhost:3000/getBlog').then((res) => {
            return res.json()
        })
            .then((data) => {
                console.log("data");
                console.log(data);
                const data2 = data.data
                console.log("data2");
                console.log(data2);

                setBlog2(data2)
                read()

            }).catch(err => {
                console.log(err);
            })

    })



    function read() {
        let data = getBlog2();
        // console.log(data,"getblog");

        let arrOfObj = getBlog2().map((arr) => JSON.parse(arr.content));
        SetContent(arrOfObj);
        // SetContent(data.content)
        // console.log(data);
        // console.log(getContent());

        // console.log(arrOfObj);

        for (let i = 0; i < getBlog2().length; i++) {
            setHeading(prevHeadings => [...prevHeadings, getBlog2()[i].heading]);
        }

    }


    return (
        <>
            <div class="bg-black min-h-screen flex flex-col items-center py-10 text-white">
                <Header />

                <div ref={el => (containerRef = el)}></div>
                <div ref={editorRef} >
                </div>


                <For each={getHeading()}>
                    {(heading, i) => {
                        let quillRef;

                        return (
                            <div>
                                <div class='bg-red-500 m-4'>

                                    <h2 class='text-6xl'>{heading}</h2>

                                    <div class='bg-orange-400' ref={quillRef} />
                                    <button class='bg-blue-500' onClick={() => handleReadMore(heading, [i()])}>Read more</button>
                                </div>

                                <Show when={getContent()[i()]}>
                                    {() => {

                                        const quill = new Quill(quillRef, {
                                            theme: "bubble",
                                            readOnly: true
                                        });

                                        const content = getContent()[i()].ops.slice(0, 2)
                                        // const content = getContent()[i()]

                                        console.log("content", content);
                                        quill.updateContents(content);
                                        // console.log("_______Content");
                                        // console.log(i());
                                        // console.log(getContent(), "_");

                                    }}
                                </Show>
                            </div>
                        );
                    }}
                </For>


            </div>
        </>
    );

}

export default Blogs
