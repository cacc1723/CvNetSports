import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

// students.controller.ts
    @Post()
    create(@Body() body: any) {
    return this.studentsService.create({
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: new Date(body.birthDate),
    });
  }
}