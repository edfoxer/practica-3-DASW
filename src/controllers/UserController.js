const User = require('../models/User');

// Crear nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario' });
  }
};

// Obtener todos los usuarios (solo admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Excluir contraseña
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
