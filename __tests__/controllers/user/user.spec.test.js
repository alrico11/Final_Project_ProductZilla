const User = require('../../../models/user/user');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../../controllers/auth/userController');

describe('User Controller', () => {
  describe('getAllUsers function', () => {
    it('should return all users', async () => {
      const users = [
        {
          fullname: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password',
          telephone: '08123456789',
          birth_date: '1990-01-01',
          gender: true
        },
        {
          fullname: 'Jane Doe',
          email: 'janedoe@example.com',
          password: 'password',
          telephone: '08123456788',
          birth_date: '1992-01-01',
          gender: true
        }
      ];

      jest.spyOn(User, 'find').mockResolvedValue(users);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should return error message when error occurs', async () => {
      const error = new Error('Database error');
      jest.spyOn(User, 'find').mockRejectedValue(error);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getUserById function', () => {
    it('should return user with given id', async () => {
      const user = {
        _id: '123',
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        telephone: '08123456789',
        birth_date: '1990-01-01',
        gender: 'Male'
      };

      jest.spyOn(User, 'findById').mockResolvedValue(user);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return error message when user with given id not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return error message when error occurs', async () => {
      const error = new Error('Database error');
      jest.spyOn(User, 'findById').mockRejectedValue(error);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createUser function', () => {
    it('should create new user', async () => {
      const newUser = {
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        telephone: '08123456789',
        birth_date: '1990-01-01',
        gender: true
      };

      jest.spyOn(User.prototype, 'save').mockResolvedValue(newUser);

      const req = {
        body: newUser
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it('should return error message when error occurs', async () => {
      const error = new Error('Database error');
      jest.spyOn(User.prototype, 'save').mockRejectedValue(error);

      const req = {
        body: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error_message: error.message });
    });
  });

  describe('updateUser function', () => {
    it('should update user with given id', async () => {
      const user = {
        _id: '123',
        fullname:   'John Doe',
        email:      'johndoe@example.com',
        telephone:  '08123456789',
        birth_date: '1990-01-01',
        gender:     'Male',
        password:   'password',
    
        save: jest.fn().mockResolvedValue()
      };

      jest.spyOn(User, 'findById').mockResolvedValue(user);

      const req = {
        params: {
          id: '123'
        },
        body: {
          fullname: 'Jane Doe'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateUser(req, res);

      expect(user.fullname).toEqual('Jane Doe');
      expect(user.email).toEqual('johndoe@example.com');
      expect(user.telephone).toEqual('08123456789');
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error message when user with given id not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      const req = {
        params: {
          id: '123'
        },
        body: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return error message when error occurs', async () => {
      const error = new Error('Database error');
      jest.spyOn(User, 'findById').mockRejectedValue(error);

      const req = {
        params: {
          id: '123'
        },
        body: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteUser function', () => {
    it('should delete user with given id', async () => {
      const user = {
        _id: '123',
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        telephone: '08123456789',
        birth_date: '1990-01-01',
        gender: 'Male',
        deleteOne: jest.fn().mockResolvedValue()
      };

      jest.spyOn(User, 'findById').mockResolvedValue(user);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteUser(req, res);

      expect(user.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return error message when user with given id not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(null);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return error message when error occurs', async () => {
      const error = new Error('Database error');
      jest.spyOn(User, 'findById').mockRejectedValue(error);

      const req = {
        params: {
          id: '123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});