export const signup = (req, res)=>{
    const {name,email, pass}=req.body;
    console.log(name,email,pass);
    
    res.send('Account created ')
}
export const login = (req, res)=>{
    const {name, pass}=req.body;
    console.log(name);
    res.send('Login successfull')
}
export const task = (req, res)=>{
    res.send('Hello task')
}
