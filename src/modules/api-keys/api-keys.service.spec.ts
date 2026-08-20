import { getRepositoryToken } from '@nestjs/typeorm';
import { expect, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeysService } from './api-keys.service';
import { ApiKey } from './entities/api-keys.entity';

import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt'
jest.mock('crypto', () => ({
  randomBytes: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));
describe('ApiKeysService', () => {
  let service: ApiKeysService;
const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn()
}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeysService, {
  provide: getRepositoryToken(ApiKey),
  useValue: mockRepository,
      }],
    }).compile();

    service = module.get<ApiKeysService>(ApiKeysService);
  });
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
it('should create and save and API key', async ()=> {
  const dto = {
    name: 'Production API',
  }
  const project = { id: 1, }

  const rawKey = 'bp_live_test123';
  const keyHash = 'hashed-key';

  (randomBytes as jest.Mock).mockReturnValue({toString: jest.fn().mockReturnValue('test123')});

  (bcrypt.hash as jest.Mock).mockResolvedValue(keyHash as never);

  const apiKey = {
    id: 1,
    name: dto.name,
    keyHash,
    project
  }
  mockRepository.create.mockReturnValue(apiKey);
  mockRepository.save.mockResolvedValue(apiKey as never)

  const result = await service.create(dto, project as never)

  expect(mockRepository.create).toHaveBeenCalledWith({name: dto.name, keyHash, project});

  expect(mockRepository.save).toHaveBeenCalledWith(apiKey )
  expect(result).toEqual({id: 1, name: 'Production API', apiKey: rawKey})
})
});
