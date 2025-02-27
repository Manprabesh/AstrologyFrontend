import { useNavigate } from "@solidjs/router";

function signup() {
    let formRef;
    const navigate = useNavigate()
    function submit(e) {

        e.preventDefault()


        console.log("data submitted");
        console.log(e);
        const data = new URLSearchParams();
        for (const pair of new FormData(formRef)) {
            data.append(pair[0], pair[1]);
        }

        fetch('http://localhost:3000/createAccount', {
            method: 'post',
            body: data,
            credentials:'include'

        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                // alert("user exist")
                if(data=="Account already exist"){
                    alert("user already exist")
                }
                else{
                    navigate('/WriteBlog', {replace:true })
                }
            }
            )

    }
    return (
        <>

            <div>
                <form ref={formRef} onSubmit={(e) => submit(e)}>
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="password" name='password' />
                    <input type="submit" />
                </form>

            </div>

        </>
    )
}

export default signup