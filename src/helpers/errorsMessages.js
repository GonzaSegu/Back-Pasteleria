module.exports = {
    PRODUCT_NOT_FOUND: {
        id: 'productoNoEncontrado',
        statusCode: 404,
        message: 'Producto no encontrado',
        description: 'El producto con el ID asignado no existe en la base de datos',
    },
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor. Prueba más tarde',
        description: 'Error inesperado en el servidor',
    },
    USER_NOT_FOUND: {
        id: 'userNotFound',
        statusCode: 404,
        message: 'Usuario no encontrado',
        description: 'El usuario no existe en el sistema',
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
        message: 'Usuario no actualizado',
        description: 'No se realizaron cambios en la base de datos',
    }
}
