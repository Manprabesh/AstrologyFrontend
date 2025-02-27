
import { onMount } from 'solid-js';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import { Show } from "solid-js"
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

function WriteBlog() {
  const navigate = useNavigate();
  let editorRef;
  let quill
  let data
  let toolbar

  const [image, setImage] = createSignal(null);
  let heading;



  onMount(() => {
    // Initialize Quill after the component mounts
    quill = new Quill(editorRef, {
      theme: 'snow',
      modules: {
        // toolbar: true
        toolbar:
          [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            ['link', 'image'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
          ],
      },

    })

  });


  function content() {
    console.log(quill);
    let data = quill.getContents()

    let base64 = data.ops.length

    data.forEach((elem) => console.log(elem))

    let head = heading.value.trim()
    if (head == "") {
      alert("title cannot be empty")

    } else {
      fetch('http://localhost:3000/data',
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data, heading: heading.value }),

        }
      ).then((data) => data.json())
        .then(data => {
          console.log(data)
        }
        )
        .catch(err => console.log(err)
        )

      navigate('/', { replace: true })

    }

  }

  return (
    <div class="h-screen bg-black text-white ">

      <input type="text" placeholder='Heading' class='h-20 w-full text-white text-6xl ml-40' ref={heading} />
      <div class="h-120 bg-black text-white w-200 ml-40" >

        <div ref={(el) => {
          editorRef = el
        }}  >
        </div>
        <button class='bg-blue-500 w-200 ' onClick={content}>sumit</button>
      </div>

    </div>
  );

}

export default WriteBlog;



