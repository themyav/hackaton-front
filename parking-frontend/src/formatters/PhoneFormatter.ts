export const formatPhone = (phoneString: string) => {
    let formattedPhone = phoneString.replace(/\D/g, '');
    if (formattedPhone.startsWith("7")) {
        formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.length > 0) {
        formattedPhone = `+7 ${formattedPhone.substring(0, 3)}${formattedPhone.length > 3 ? ` ${formattedPhone.substring(3, 6)}` : ''}${formattedPhone.length > 6 ? ` ${formattedPhone.substring(6, 8)}` : ''}${formattedPhone.length > 8 ? ` ${formattedPhone.substring(8, 10)}` : ''}`.trim();
    } else {
        formattedPhone = "";
    }
    return formattedPhone.substring(0, 16).toString();
}