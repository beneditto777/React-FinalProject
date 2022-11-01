import { useState } from "react"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
// import { bcrypt } from "bcryptjs"
import "./login.css"

function Login() {
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)

    let navigate = useNavigate()
    let location = useLocation()
    let from = location.state?.from?.pathname || "/"

    const handleLogin = () => {
        if (password === "admin") {
            localStorage.setItem("token", "login")
            navigate(from, {replace: true})
            console.log("success");
        } else {
            console.log("failed");
            setShow(true)
            setPassword("")
            return <Navigate to="/login" state={{ from: location }}/>
        }
    }

    const pressEnterToSearch = (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            handleLogin()
        } 
    }

    return(
        <>
            {show === true ? 
                <div className="container mt-3">
                    <div className="alert alert-danger alert-dismissible" role="alert">   
                        <div>Invalid Password!</div>   
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}></button>
                    </div>
                </div>
                :
                <>
                </>
            }
            
            <div id="formLogin">
                <div className="login-page">
                    <div className="form">
                        <input
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => pressEnterToSearch(e)}
                        />
                        <button type="submit" onClick={handleLogin}>login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login