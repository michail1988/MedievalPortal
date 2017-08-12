export function isLoggedin() {
    return !!localStorage.getItem( 'userid' );
}