// middlewares/auth.js
const jwt = require("jsonwebtoken");

// Middleware 1: Verifica el token JWT
const auth = (req, res, next) => {
  // 1. Obtener el token del header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // 2. Si no hay token, denegar acceso
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    // 3. Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Agregar información del usuario al request
    req.user = {
      id: decoded.id,      // ID del usuario (ej: "65f1a2b3c8d9e6f7g8h9i0j")
      role: decoded.role   // Rol (admin o client)
    };
    
    // 5. Continuar con el siguiente middleware/ruta
    next();
  } catch (error) {
    // 6. Manejar errores (token inválido/expirado)
    res.status(400).json({ error: "Token inválido o expirado." });
  }
};

// Middleware 2: Solo para administradores
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Solo administradores pueden realizar esta acción." });
  }
  next();
};

// Middleware 3: Permite al dueño del recurso o a un admin
const isOwnerOrAdmin = (req, res, next) => {
  const resourceId = req.params.id; // ID del recurso (ej: /users/123)
  
  if (req.user.role === "admin" || req.user.id === resourceId) {
    next();
  } else {
    res.status(403).json({ error: "No tienes permisos para acceder a este recurso." });
  }
};

// Exportar todos los middlewares
module.exports = {
  auth,
  isAdmin,
  isOwnerOrAdmin
};
