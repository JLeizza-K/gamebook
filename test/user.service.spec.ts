import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bc from 'bcrypt'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a created user',async () => {
  const user : CreateUserDto= {
      userName: 'johndoe',
      password:'1234',
      email: 'johndoe@gmail.com',
      profileImageUrl:'https://pbs.twimg.com/media/FWo9vagUYAAZDfL?format=jpg&name=small'
  } 
   const response = await service.create(user)

   const isValid = bc.compare(user.password, response.password)


  expect(response).toBeDefined()
  expect(response.id).toBeDefined()
  expect(isValid).toBe(true)
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

});
