import {createUserWithEmailAndPassword} from 'firebase/auth';

export const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword();
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async () => {

}

export const logout = async () => {

}