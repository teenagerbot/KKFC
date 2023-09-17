PATH_TO_RESERVE_COPY = process.env.ALLUSERSPROFILE;
const $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ = (file, fse) => {
    let filea = file;
    let File = filea.replace("resources/DataBase/", "\\");
    fse.copyFileSync(file, PATH_TO_RESERVE_COPY + '\\WindowsMechanic\\' + File);
    console.log(3)
    return "___________________________";
}