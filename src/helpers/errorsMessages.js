module.exports = {
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor. Prueba más tarde',
        description: 'Error inesperado en el servidor',
    },
    ID_NOT_FOUND: {
        id: 'idNotFound',
        statusCode: 404,
        message: 'Id no encontrado',
        description: 'El id no existe en el sistema',
    },
    INVALID_CREDENTIALS: {
        id: 'invalidCredentials',
        statusCode: 401,
        message: 'Credenciales inválidas',
        description: 'El email o la contraseña son incorrectos',
    },
    REGISTER_ERROR: {
        id: 'registerError',
        statusCode: 400,
        message: 'Error en el registro',
        description: 'No se pudo registrar el usuario. Verifica los datos ingresados.',
    },
    UPDATE_ERROR: {
        id: 'updateError',
        statusCode: 400,
        message: 'Registro no actualizado',
        description: 'No se realizaron cambios en la base de datos',
    },
    PRODUCT_NOT_FOUND: {
        id: 'productoNoEncontrado',
        statusCode: 404,
        message: 'Producto no encontrado',
        description: 'El producto con el ID asignado no existe en la base de datos',
    },
    FORMA_NOT_FOUND: {
        id: 'formaNoEncontrada',
        statusCode: 404,
        message: 'Forma no encontrado',
        description: 'La forma con el ID asignado no existe en la base de datos',
    },
    CATEGORIA_NOT_FOUND: {
        id: 'categoriaNoEncontrada',
        statusCode: 404,
        message: 'Categoria no encontrada',
        description: 'La categoria con el ID asignado no existe en la base de datos',
    },
    PORCION_NOT_FOUND: {
        id: 'porcionNoEncontrada',
        statusCode: 404,
        message: 'Porcion no encontrada',
        description: 'La porcion con el ID asignado no existe en la base de datos',
    },
    ROL_NOT_FOUND: {
        id: 'rolNoEncontrado',
        statusCode: 404,
        message: 'Rol no encontrada',
        description: 'El rol con el ID asignado no existe en la base de datos',
    },
    COMUNA_NOT_FOUND: {
        id: 'comunaNoEncontrada',
        statusCode: 404,
        message: 'Comuna no encontrada',
        description: 'La comuna con el ID asignado no existe en la base de datos',
    },
    ESTADO_NOT_FOUND: {
        id: 'estadoNoEncontrado',
        statusCode: 404,
        message: 'Estado no encontrada',
        description: 'El estado con el ID asignado no existe en la base de datos',
    }
}
