'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        console.log("hello");
        if(!name || !email || !password){
            console.log("hello");
            setError("enter all fields");
            return ;
        }
        try{ 
            // const resUserExists = await fetch('api/userExists',{
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json"
            //     },
            //     body:JSON.stringify({
            //         email
            //     })
            // })
            // const {user} = await resUserExists.json();
            // if(user){
            //     setError("user already exists");
            //     return ;
            // }
            const res = await fetch('api/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,email,password
                })
            })
            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/");
            }else{
                console.log("User registration failed.")
            }
        }catch(error){
            console.log("Error during registration: ",error);
        }
    }
    return (
        <main className="main" style={{ display: "flex" }}>
            {/* className="h-100vh w-50vw bg-blue-500" */}
            <div className="outerContainermobile" >
                <div className="Anappmobile">
                    <Image src="/Ellipse 111.png" alt="el" height={40} width={40} />
                    <Image src="/Vector 7.png" alt="discord" height={40} width={40} style={{ position: 'absolute', top: 25, left: 10 }} />
                </div>
                <div className="base">Base</div>
            </div>
            <div className="outerContainer" >
                <div className="Anapp">
                    <Image src="/Ellipse 111.png" alt="el" height={40} width={40} />
                    <Image src="/Vector 7.png" alt="discord" height={40} width={40} style={{ position: 'absolute', top: 34, left: 20 }} />
                </div>
                <div className="base">Base</div>
                <div id="imageCon">
                    <Image src="/Frame 2@2x.png" alt="discord" height={180} width={180} />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50vw", gap: "20px", backgroundColor: " #F8FAFF" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className="signinmobile">
                        <div className="signin">Sign up</div>
                        <div className="below">Sign up to your account</div>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Image src="/Google Sign In.png" alt="discord" height={180} width={180} />
                        <Image src="/Apple Sign In.png" alt="discord" height={180} width={180} />
                    </div>
                    <div className="outerofconteiner">
                        <form onSubmit={handleSubmit} className="container" >
                            <div>
                                <div>Name</div>
                                <input onChange={(e) => setName(e.target.value)} type="string" style={{ padding: "5px", border: "1px solid lightgray", backgroundColor: "lightgray", borderRadius: "5px", height: "40px", marginTop: "5px", width: "100%" }} />
                            </div>
                            <div>
                                <div>Email address</div>
                                <input onChange={(e) => setEmail(e.target.value)} type="string" style={{ padding: "5px", border: "1px solid lightgray", backgroundColor: "lightgray", borderRadius: "5px", height: "40px", marginTop: "5px", width: "100%" }} />
                            </div>
                            <div>
                                <div>Password</div>
                                <input onChange={(e) => setPassword(e.target.value)} type="string" style={{ padding: "5px", border: "1px solid lightgray", backgroundColor: "lightgray", borderRadius: "5px", height: "40px", marginTop: "5px", width: "100%" }} />
                            </div>
                            <div style={{ color: "blue" }}>Forget Password?</div>
                            <button type="submit" style={{ backgroundColor: "blue", color: "white", height: "40px", borderRadius: "5px" }}>Sign up</button>
                            {error && <div style={{ backgroundColor: "red", width: "100px", padding: "10px", borderRadius: "5px", color: "white" }}>{error}</div>}
                        </form>
                    </div>
                    <div className="remobile">
                        <span style={{ color: "lightgrey" }}> Already have an account?</span><Link href="/" style={{ color: "blue" }}> Login here</Link>

                    </div>
                    <div id="imageConmobile">
                        <Image src="/Group 7568.png" alt="discord" height={180} width={180} />
                    </div>
                </div>
            </div>
        </main>
    );
}

