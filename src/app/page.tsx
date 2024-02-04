"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (e:any)=>{
    e.preventDefault();
        console.log("hello");
    try{
      const resUserExists = await fetch('api/userExists',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    })
    const {user} = await resUserExists.json();
    if(user){
        router.push("/dashboard");
    }
    }catch(error){
      console.log(error);
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
            <div className="signin">Sign In</div>
            <div className="below">Sign in to your account</div>
          </div>
          <div className="signinbox" >
            <div style={{ display: "flex", gap: "5px",backgroundColor:"white",padding:"5px 10px",borderRadius:"5px",width:"130%",height:"25px" }}>
            <Image src="/google.png" alt="discord" height={18} width={15} /><span style={{fontSize:"8px"}}>Sign in with Google</span>
            </div>
            <div style={{ display: "flex", gap: "5px",backgroundColor:"white",padding:"5px 10px",borderRadius:"5px" ,width:"130%",height:"25px"}}>
            <Image src="/apple-logo.png" alt="discord" height={18} width={15}  /><span style={{fontSize:"8px"}}>Sign in with Apple</span>
            </div>
          </div>
          <div className="outerofconteiner">
          <form onSubmit={handleSubmit}  className="container" >
            <div>
              <div>Email address</div>
              <input onChange={(e) => setEmail(e.target.value)} type="string" style={{ padding: "5px", border: "1px solid lightgray", backgroundColor: "lightgray", borderRadius: "5px", height: "40px", marginTop: "5px", width: "100%" }} />
            </div>
            <div>
              <div>Password</div>
              <input onChange={(e) => setPassword(e.target.value)} type="string" style={{ padding: "5px", border: "1px solid lightgray", backgroundColor: "lightgray", borderRadius: "5px", height: "40px", marginTop: "5px", width: "100%" }} />
            </div>
            <div style={{ color: "blue" }}>Forget Password?</div>
            <button type="submit" style={{ backgroundColor: "blue", color: "white", height: "40px", borderRadius: "5px" }}>Sign In</button>
          </form>
          </div>
          <div className="remobile">
            <span style={{ color: "lightgrey" }}> Don&apos;t have an account?</span><span style={{ color: "blue" }}><Link href="/register">Register here</Link> </span>
          </div>
          <div id="imageConmobile">
          <Image src="/Group 7568.png" alt="discord" height={180} width={180} />
        </div>
        </div>
      </div>
    </main>
  );
}
