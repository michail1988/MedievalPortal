export function isLoggedin() {
    return ( !!localStorage.getItem( 'userid' ) ) && ( !!localStorage.getItem( 'username' ) );
}