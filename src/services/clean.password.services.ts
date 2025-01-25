export const cleanPassword = async (data: any) => {
    let datas = data
    let {
        dataValues
    } = datas
    delete dataValues.password


    return dataValues
}