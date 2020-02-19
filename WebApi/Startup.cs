using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using OA.DBModel;
using OA.Repository;
using OA.Repository.Interfaces;
using OA.Repository.Repositories;
using OA.Service.Interfaces;
using OA.Service.Services;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();
            services.AddMvc();
            services.AddAutoMapper(typeof(Startup));
            services.Configure<ApplicationSettings>(Configuration.GetSection("ApplicationSettings"));


            services.AddDbContext<OA.Repository.ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Dependency Register
            //Repository
            services.AddScoped(typeof(IDepartmentRepository), typeof(DepartmentRepository));
            services.AddScoped(typeof(ISemesterRepository), typeof(SemesterRepository));
            services.AddScoped(typeof(IDesignationRepository), typeof(DesignationRepository));
            services.AddScoped(typeof(ICourseRepository), typeof(CourseRepository));
            services.AddScoped(typeof(ITeacherRepository), typeof(TeacherRepository));
            services.AddScoped(typeof(ICourseAssignToTeacherRepository), typeof(CourseAssignToTeacherRepository));
            services.AddScoped(typeof(IStudentRegisterRepository), typeof(StudentRegisterRepository));
            services.AddScoped(typeof(IAllocateClassRoomRepository), typeof(AllocateClassRoomRepository));
            services.AddScoped(typeof(IEnrollCourseRepository), typeof(EnrollCourseRepository));
            services.AddScoped(typeof(IStudentResultRepository), typeof(StudentResultRepository));

            //Service
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddTransient<ISemesterService, SemesterService>();
            services.AddTransient<IDesignationService, DesignationService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<ITeacherService, TeacherService>();
            services.AddTransient<ICourseAssignToTeacherService, CourseAssignToTeacherService>();
            services.AddTransient<IStudentRegisterService, StudentRegisterService>();
            services.AddTransient<IAllocateClassRoomService, AllocateClassRoomService>();
            services.AddTransient<IEnrollCourseService, EnrollCourseService>();
            services.AddTransient<IStudentResultService, StudentResultService>();




            //jwt auth


            services.AddDefaultIdentity<ApplicationUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<OA.Repository.ApplicationContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;


            });

            //JWT Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();
            app.UseCors(builder =>
             builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
            .AllowAnyHeader()
            .AllowAnyMethod()

            );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //   app.UseCors(builder =>
            //builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
            //.AllowAnyHeader()
            //.AllowAnyMethod()

            //);
            
        }
    }
}
