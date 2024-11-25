import { buildUserService } from "./user.service";



describe('Test user service', () => {
  it('should hash the password and call createNewUser', async () => {
    const mockCreateNewUser = jest.fn().mockResolvedValue({
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'Lapiz'
    });

    const userRepository = { createNewUser: mockCreateNewUser };
    const userService = buildUserService(userRepository);

    const user = {
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    };

    const result = await userService.register(user);

    expect(mockCreateNewUser).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: expect.any(String), // Ensure password is hashed
    }));

    expect(result).toEqual({
      id: '123',
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    });
  });
});
