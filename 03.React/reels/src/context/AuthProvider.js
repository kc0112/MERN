import React,{useState,useContext,useEffect} from 'react'
import { auth } from '../firebase'

export const AuthContext = React.createContext(); // creating context
                  // App.js -> <AuthProvider>..everything in btw goes in props.children..</AuthProvider>
function AuthProvider({ children }) {
    
    const[currentUser,setCurrentUser] =useState();
    const [loading, setLoading] = useState(true);
    
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);// promise
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }

    useEffect(() => {
        // later for unmount
        const unsubscribe  = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            console.log(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    }, [])
    
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        // provides value to everything wrapped in it
        <AuthContext.Provider value={value}>
            {/* loading = false -> go to children */}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider