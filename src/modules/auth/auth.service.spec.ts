import { expect, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService ={
    findByEmail: jest.fn(),
    create: jest.fn()
  }
  const mockJwtService= {
    signAsync: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user and return access token', async () => {
 const dto = {
  email: 'test@gmail.com',
  password: '12345678',
 };
 const user = {
  id: 1,
  email: dto.email,
  password: 'hashedPassword',
 };
 const token = 'mock-jwt-token'

 mockUsersService.findByEmail.mockResolvedValue(null as never)
 mockUsersService.create.mockResolvedValue(user as never)
 mockJwtService.signAsync.mockResolvedValue(token as never)
 const result = await service.signup(dto)
 expect(mockUsersService.findByEmail).toHaveBeenCalledWith(dto.email)
 expect(mockUsersService.create).toHaveBeenCalled()
 expect(mockJwtService.signAsync).toHaveBeenCalledWith({sub: user.id, email: user.email})
expect(result).toEqual({accessToken: token, user,})
  })

  it('should throw ConflictException if email alraedy exits', async () => {
 const dto = {
  email: 'test@gmail.com',
  password: '12345678',
 };
 const existingUser = {
  id: 1,
  email: dto.email,
  password: 'hashedPassword',
 };
 mockUsersService.findByEmail.mockResolvedValue(existingUser as never)
 await expect(async () => {
  await service.signup(dto);
}).rejects.toThrow(ConflictException);
 expect(mockUsersService.create).not.toHaveBeenCalled()
 expect(mockJwtService.signAsync).not.toHaveBeenCalled()
  })


});
