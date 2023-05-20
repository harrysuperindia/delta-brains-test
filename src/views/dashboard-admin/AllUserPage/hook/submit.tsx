import { useCallback, useState } from "react";

export const useSubmit = (name: any, email: any, phone: any) =>{

    const [isSubmit, setSubmit] = useState(false);
    
    const hanldSubmit = useCallback(async () => {
        try {
            localStorage.setItem('nameUser', name);
            localStorage.setItem('emailUser', email);
            localStorage.setItem('phoneUser', phone);
            setSubmit(true)
            
        } catch (e) {
          
        } finally {
        }
      }, [
        name,
        email,
        phone
      ])


    return { hanldSubmit, isSubmit }
}