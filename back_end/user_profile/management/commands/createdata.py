import random
import faker.providers
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth.models import User, Group
from tranfusion_center.models import TranfusionCenter
from user_profile.models import UserProfile
from questionnaire.models import Questionnaire
import datetime
import pytz

GROUP_PERMISSIONS = [
    1, 2, 4
]

GENDER = [
    'M', 'F', 'N'
]

BLOOD_TYPE = [
    'A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG', 'N'
]

class Provider(faker.providers.BaseProvider):
    def group_permissions(self):
        return self.random_element(GROUP_PERMISSIONS)
    
    def genders(self):
        return self.random_element(GENDER)

    def blood_types(self):
        return self.random_element(BLOOD_TYPE)

class Command(BaseCommand):
    help = "Command information"

    def handle(self, *args, **kwargs):

        fake = Faker()
        fake.add_provider(Provider)

        for _ in range(3):
            TranfusionCenter.objects.create(name=fake.company(), country=fake.country(),
             city=fake.city(), street=fake.street_name(), building_number=str(fake.building_number()), description=fake.text(), average_grade=random.choice(range(0, 10)))

        for _ in range(3):
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
            user.userprofile.blood_type=fake.blood_types()
            user.userprofile.profession=fake.job()
            user.userprofile.workplace=fake.text()
            if gr_per == 2:
                user.userprofile.tranfusion_center=random.choice(tc)
            user.save()

        for _ in range(3):
            tz = pytz.timezone('Europe/Belgrade')
            Questionnaire.objects.create(user_profile=random.choice(UserProfile.objects.filter(tranfusion_center=None)),
            less_than_50kg=random.choice([True, False]),
            flu=random.choice([True, False]),
            other_sickness=random.choice([True, False]),
            feel_good=random.choice([True, False]), 
            changes_on_skin=random.choice([True, False]),
            blood_preasure_high=random.choice([True, False]),
            blood_preasure_low=random.choice([True, False]),
            using_medicine=random.choice([True, False]),
            last_medicine_in_last_7_days=random.choice([True, False]),
            on_menstruation_period=random.choice([True, False]),
            dental_interventions_in_last_7_days=random.choice([True, False]),
            tattoo_piercing_in_last_6_months=random.choice([True, False]),
            surgery_in_last_6_months=random.choice([True, False]),
            blood_tranfusion_in_last_6_months=random.choice([True, False]),
            pregnant=random.choice([True, False]),
            created=datetime.datetime.now(tz=tz),
            updated=datetime.datetime.now(tz=tz)
            )
            