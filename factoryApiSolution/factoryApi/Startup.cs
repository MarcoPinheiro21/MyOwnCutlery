using System;
using System.Net.Http;
using factoryApi.Context;
using factoryApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace factoryApi
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
            services.AddDbContext<MasterFactoryContext>(opt =>
                opt.UseSqlServer(Configuration["ConnectionString:factoryDB"]));
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2); 
            services.AddCors(options => options.AddPolicy("AllowAll",
                p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
                options.HttpsPort = 5001;
            });

            Uri productionEndPoint = new Uri("http://localhost:1337");
            HttpClient httpClient = new HttpClient()
            {
                BaseAddress = productionEndPoint
            };
            services.AddSingleton<HttpClient>(httpClient);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                // The default HSTS value is 30 days. You may want to change this for production scenarios,
                // see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseMvc();
        }
    }
}