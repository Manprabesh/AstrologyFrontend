import { A, useNavigate } from "@solidjs/router"
function Login() {
    const navigate = useNavigate()
    let formRef;

    function userlogin(e) {

        e.preventDefault()

        const data = new URLSearchParams();
        for (const pair of new FormData(formRef)) {
            data.append(pair[0], pair[1]);
        }

        fetch("http://localhost:3000/login", {
            body: data,
            method: "post",
            credentials: 'include'
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data);

                if (data == 'User exist') {
                    navigate('/WriteBlog')
                }
                else {
                    alert("something went wrong")
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div class='bg-amber-600 h-full '>
                <div>
                    <form ref={formRef} onSubmit={(e) => userlogin(e)}>
                        <input type="email" placeholder="Email" name="email" />
                        <input type="password" placeholder="password" name='password' />
                        <input type="submit" />
                    </form>
                </div>
                <h1>Don't have an account <A href="/signup">signup</A> </h1>
            </div>
        </>
    )
}

export default Login