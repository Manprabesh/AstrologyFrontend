import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
function Header() {
    const navigate = useNavigate();
    // console.log(setting);
    function check_user_login() {

        fetch('http://localhost:3000/checkUserLogin', {
            // method: "GET",
            credentials: 'include'
        })
         .then((res) => { return res.json() })
         .then((data) => createAccount(data))
         .catch(err=>console.log(err))

    }

    function Logout() {

        fetch('http://localhost:3000/logout', {
            credentials: 'include'
        }).then(res => res.json())
         .then(data => console.log(data)
         ).catch(err => console.log(err))
    }


    function createAccount(data) {
        if (data == 'user not login') {
            navigate('/login')
        }
        else {
            navigate('/WriteBlog')
        }

    }


    return (
        <>
            <div class='text white h-20 w-full bg-blue-500'>
                <div class='flex justify-between ml-10 mr-10'>

                    <h1> <button onClick={() => check_user_login()}>Write blog</button></h1>
                    <h1> <A href="/">home</A></h1>
                    <h1 onClick={() => Logout()}> Logout</h1>
                    <h1> <A href="/blog"> Blog</A></h1>

                </div>
            </div>
        </>
    )
}

export default Header