import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {expect, jest} from '@jest/globals'
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';



describe('UsersService', () => {
  let service: UsersService;
const mockUserRepository ={
 create: jest.fn(),
 save: jest.fn(),
 findOneBy: jest.fn()
}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save a user', async () =>{
 const dto = {
  email: 'test@gmail.com',
  password: "12345678",
 };
 const user = {
  id: 1,
  ...dto,
 } as User
    mockUserRepository.create.mockReturnValue(user)

    mockUserRepository.save.mockResolvedValue(user as never)

    const result = await service.create(dto)

   expect(mockUserRepository.create).toHaveBeenCalledWith(dto)
    expect(mockUserRepository.save).toHaveBeenCalledWith(user)
    expect(result).toEqual(user)
  })
  it('should return a user when user exists', async () =>{
    const id = 1;
    const user = {
      id,
      email: 'test@gmail.com',
  password: "12345678",
    } as User

 mockUserRepository.findOneBy.mockResolvedValue(user as never)
 const result = await service.findById(id)
 expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({id})
 expect(result).toEqual(user)

  })

  it('should return null when user does not exits', async()=>{
  const id = 1;

 mockUserRepository.findOneBy.mockResolvedValue(null as never)
 const result = await service.findById(id)
 expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({id})
 expect(result).toBeNull()
  })

  it('should return a user when email exists', async () => {
 const email = 'test@gmail.com'
    const user = {

      email: 'test@gmail.com',
  password: "12345678",
    } as User

 mockUserRepository.findOneBy.mockResolvedValue(user as never)
 const result = await service.findByEmail(email )
 expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({email})
 expect(result).toEqual(user)
  })

  it('should return null when email does not exits', async ()=>{
const email = 'test@gmail.com'
 mockUserRepository.findOneBy.mockResolvedValue(null as never)
 const result = await service.findByEmail(email)
 expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({email})
 expect(result).toBeNull()
  })
});
