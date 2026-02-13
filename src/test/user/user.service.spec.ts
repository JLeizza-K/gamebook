import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../modules/user/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const createUserDto: CreateUserDto = {
      userName: 'johndoe',
      password: '1234',
      email: 'johndoe@gmail.com',
      profileImageUrl:
        'https://pbs.twimg.com/media/FWo9vagUYAAZDfL?format=jpg&name=small',
    };

    const mockUser = {
      id: 1,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRepository.create.mockReturnValue(mockUser);
    mockRepository.save.mockResolvedValue(mockUser);

    const result = await service.create(createUserDto);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.userName).toBe('johndoe');
    expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
  });
});
