import random
import faker.providers
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth.models import User, Group
from tranfusion_center.models import TranfusionCenter
from user_profile.models import UserProfile

GROUP_PERMISSIONS = [
    1, 2, 3, 4
]

GENDER = [
    1, 2, 3
]

class Provider(faker.providers.BaseProvider):
    def group_permissions(self):
        return self.random_element(GROUP_PERMISSIONS)
    
    def genders(self):
        return self.random_element(GENDER)

class Command(BaseCommand):
    help = "Command information"

    def handle(self, *args, **kwargs):

        fake = Faker()
        fake.add_provider(Provider)

        for _ in range(1):
            TranfusionCenter.objects.create(name=fake.company(), description=fake.text(), country=fake.country(),
             city=fake.city(), address=fake.address())

        for _ in range(1):
            tc = TranfusionCenter.objects.all()
            new_email=fake.email()
            gr_per = fake.group_permissions()
            user = User.objects.create(email=new_email, password=fake.password(), username=new_email,
            first_name=fake.name(), last_name=fake.last_name())
            user.groups.add(gr_per)
            user.userprofile.address=fake.address()
            user.userprofile.city=fake.city()
            user.userprofile.country=fake.country()
            user.userprofile.phone_number=fake.phone_number()
            user.userprofile.jmbg=fake.msisdn()
            user.userprofile.gender=fake.genders()
            user.userprofile.profession=fake.job()
            user.userprofile.workplace=fake.text()
            if gr_per == 1:
                user.userprofile.tranfusion_center=random.choice(tc)
            user.save()