export const handleUserType = (t: string) => {
    if (t === "REGULAR_USER_TYPE") return "Жилец";
    else if (t === "MANAGING_COMPANY_USER_TYPE") return "Управляющая компания"
    else return "Администратор";
};