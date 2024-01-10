import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();
    return ( 
        <div>
            Settings
            {JSON.stringify(session)}
            <form action={async ()=>{
                "use server"; 
                await signOut();
                }}>
                    <button type="submit">
                        SignOut
                    </button>
            </form>
        </div>
     );
}
 
export default SettingsPage;