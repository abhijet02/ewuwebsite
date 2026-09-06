import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccordionService } from './accordion.service';
import { Accordion } from '../entities/accordion.entity';
import {
  CreateAccordionInput,
  UpdateAccordionInput,
} from '../dto/accordion.input';

@Resolver(() => Accordion)
export class AccordionResolver {
  constructor(private readonly accordionService: AccordionService) {}

  @Mutation(() => Accordion)
  createAccordion(
    @Args('createAccordionInput') createAccordionInput: CreateAccordionInput,
  ) {
    return this.accordionService.create(createAccordionInput);
  }

  @Query(() => [Accordion], { name: 'accordions' })
  findAll() {
    return this.accordionService.findAll();
  }

  @Query(() => Accordion, { name: 'accordion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accordionService.findOne(id);
  }

  @Mutation(() => Accordion)
  updateAccordion(
    @Args('updateAccordionInput') updateAccordionInput: UpdateAccordionInput,
  ) {
    return this.accordionService.update(
      updateAccordionInput.id,
      updateAccordionInput,
    );
  }

  @Mutation(() => Accordion)
  removeAccordion(@Args('id', { type: () => Int }) id: number) {
    return this.accordionService.remove(id);
  }
}
